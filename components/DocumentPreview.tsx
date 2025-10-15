'use client'

import { useTranslation } from 'react-i18next'
import { ParData } from '@/types/par'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { TrainCoverImage } from '@/components/ui/train-cover-image'

interface DocumentPreviewProps {
  data: ParData
  className?: string
}

export function DocumentPreview({ data, className }: DocumentPreviewProps) {
  const { t } = useTranslation(['common', 'doc'])

  return (
    <div className={cn('document-preview', className)}>
      {/* Cover Page */}
      <section className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold mb-4 text-blue-700 border-b border-blue-200 pb-2">
            {t('doc:title')}
          </h2>
          
          <div className="mb-4">
            <h3 className="text-md font-semibold text-blue-600 mb-2">
              {data.projectName || t('doc:subtitle')}
            </h3>
          </div>
        </div>
        
        {/* Train Cover Image */}
        <div className="mb-6">
          <TrainCoverImage height="h-40" className="mx-auto max-w-2xl" />
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Abstract</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {data.abstract || data.background || "This document outlines the approval request for conducting a comprehensive assessment of network and data centers to modernize and optimize the infrastructure for future needs."}
          </p>
        </div>
        
        <div className="text-xs text-gray-500 mt-4">
          {t('doc:documentGenerated')} {new Date().toLocaleDateString()}
        </div>
      </section>
      
      {/* Page break */}
      <div className="page-break"></div>

      {/* Project Details */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-blue-700 border-b border-blue-200 pb-2">
          {t('doc:projectDetails')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <strong>{t('doc:projectName')}:</strong> {data.projectName}
          </div>
          <div>
            <strong>{t('doc:programName')}:</strong> {data.programName}
          </div>
          <div>
            <strong>{t('doc:projectDuration')}:</strong> {data.projectDuration}
          </div>
          <div>
            <strong>{t('doc:expectedStart')}:</strong> {formatDate(data.expectedStart)}
          </div>
          <div>
            <strong>{t('doc:priority')}:</strong> {data.priority}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('doc:background')}</h3>
          <p className="text-justify">{data.background}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('doc:problemStatement')}</h3>
          <p className="text-justify">{data.problemStatement}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('doc:objectives')}</h3>
          <ul className="list-disc pl-6">
            {data.objectives.map((objective, index) => (
              <li key={index} className="mb-1">{objective}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('doc:inScope')}</h3>
          <ul className="list-disc pl-6">
            {data.inScope.map((item, index) => (
              <li key={index} className="mb-1">{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('doc:outOfScope')}</h3>
          <ul className="list-disc pl-6">
            {data.outOfScope.map((item, index) => (
              <li key={index} className="mb-1">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefits & Impact Analysis */}
      <section className="mb-8 print-break">
        <h2 className="text-lg font-bold mb-4 text-blue-700 border-b border-blue-200 pb-2">
          {t('doc:benefitsImpactAnalysis')}
        </h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('doc:operationalBenefits')}</h3>
          <ul className="list-disc pl-6">
            {data.operationalBenefits.map((benefit, index) => (
              <li key={index} className="mb-1">{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('doc:financialImpact')}</h3>
          <ul className="list-disc pl-6">
            {data.financialImpact.map((impact, index) => (
              <li key={index} className="mb-1">{impact}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('doc:digitalAlignment')}</h3>
          <ul className="list-disc pl-6">
            {data.digitalAlignment.map((alignment, index) => (
              <li key={index} className="mb-1">{alignment}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Risk Analysis */}
      <section className="mb-8 print-break">
        <h2 className="text-xl font-bold mb-4">{t('doc:riskAnalysis')}</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                  {t('doc:riskName')}
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                  {t('doc:riskDescription')}
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                  {t('doc:riskAnalysis')}
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                  {t('doc:likelihood')}
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                  {t('doc:impact')}
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                  {t('doc:responsePlan')}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.risks.map((risk, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-3 py-2">{risk.name}</td>
                  <td className="border border-gray-300 px-3 py-2">{risk.description}</td>
                  <td className="border border-gray-300 px-3 py-2">{risk.analysis}</td>
                  <td className="border border-gray-300 px-3 py-2">{risk.likelihood}</td>
                  <td className="border border-gray-300 px-3 py-2">{risk.impact}</td>
                  <td className="border border-gray-300 px-3 py-2">{risk.responsePlan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Contracting Approach */}
      <section className="mb-8 print-break">
        <h2 className="text-xl font-bold mb-4">{t('doc:contractingApproach')}</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('doc:governanceAlignment')}</h3>
          <ul className="list-disc pl-6">
            {data.governanceAlignment.map((item, index) => (
              <li key={index} className="mb-1">{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('doc:marketResearch')}</h3>
          <ul className="list-disc pl-6">
            {data.marketResearch.map((item, index) => (
              <li key={index} className="mb-1">{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t('doc:finalSelection')}</h3>
          <p className="text-justify">{data.finalSelection}</p>
        </div>

        {data.contractingNotes && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{t('doc:contractingNotes')}</h3>
            <p className="text-justify">{data.contractingNotes}</p>
          </div>
        )}
      </section>

      {/* Budget */}
      <section className="mb-8 print-break">
        <h2 className="text-xl font-bold mb-4">{t('doc:estimatedBudget')}</h2>
        
        <div className="space-y-4">
          <div>
            <strong>{t('doc:estimatedBudget')}:</strong> {data.estimatedBudget}
          </div>
          
          {data.isMultiYear && (
            <div>
              <strong>Multi-Year Project:</strong> Yes
              <div className="ml-4 mt-2 space-y-1">
                {data.budgetYears.map((year, index) => (
                  <div key={index}>
                    <strong>Budget {year.year}:</strong> {year.amount}
                    {year.description && <span> - {year.description}</span>}
                  </div>
                ))}
                <div>
                  <strong>Total Budget:</strong> {data.totalBudget}
                </div>
              </div>
            </div>
          )}
          
          {data.approvedBudgetEntries.length > 0 && (
            <div>
              <strong>Approved Budget Entries:</strong>
              <div className="ml-4 mt-2 space-y-1">
                {data.approvedBudgetEntries.map((entry, index) => (
                  <div key={entry.id}>
                    <strong>Approved {entry.year} ({entry.type}):</strong> {entry.amount} - {entry.description}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {data.approvedBudgetAtBoard && (
            <div>
              <strong>{t('doc:approvedBudgetAtBoard')}:</strong> {data.approvedBudgetAtBoard}
            </div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-8 print-break">
        <h2 className="text-xl font-bold mb-4">{t('doc:highLevelTimeline')}</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                  {t('doc:startDate')}
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                  {t('doc:endDate')}
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                  {t('doc:label')}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.timeline.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-3 py-2">{formatDate(item.startDate)}</td>
                  <td className="border border-gray-300 px-3 py-2">{formatDate(item.endDate)}</td>
                  <td className="border border-gray-300 px-3 py-2">{item.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Approval Decision */}
      {data.approvalDecision && (
        <section className="mb-8 print-break">
          <h2 className="text-xl font-bold mb-4">{t('doc:approvalDecision')}</h2>
          <p className="text-justify">{data.approvalDecision}</p>
        </section>
      )}

      {/* Approval Signoff */}
      {data.approvalSignoff && (
        <section className="mb-8 print-break">
          <h2 className="text-xl font-bold mb-4">{t('doc:approvalSignoff')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>{t('doc:approverName')}:</strong> {data.approvalSignoff.approverName}
            </div>
            <div>
              <strong>{t('doc:role')}:</strong> {data.approvalSignoff.role}
            </div>
            {data.approvalSignoff.signDate && (
              <div>
                <strong>{t('doc:signDate')}:</strong> {formatDate(data.approvalSignoff.signDate)}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Revision History */}
      {data.revisions.length > 0 && (
        <section className="mb-8 print-break">
          <h2 className="text-xl font-bold mb-4">{t('doc:revisionHistory')}</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                    {t('doc:version')}
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                    {t('doc:change')}
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                    {t('doc:changedBy')}
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                    {t('doc:changeDate')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.revisions.map((revision, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-3 py-2">{revision.version}</td>
                    <td className="border border-gray-300 px-3 py-2">{revision.change}</td>
                    <td className="border border-gray-300 px-3 py-2">{revision.by}</td>
                    <td className="border border-gray-300 px-3 py-2">{formatDate(revision.changeDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Attachments */}
      {data.attachments.length > 0 && (
        <section className="mb-8 print-break">
          <h2 className="text-xl font-bold mb-4">{t('doc:attachments')}</h2>
          
          <ul className="list-disc pl-6">
            {data.attachments.map((attachment, index) => (
              <li key={index} className="mb-2">
                <strong>{attachment.title}</strong>
                {attachment.note && (
                  <span className="text-gray-600 italic"> - {attachment.note}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
